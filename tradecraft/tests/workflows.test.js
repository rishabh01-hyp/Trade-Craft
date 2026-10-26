import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyBookings, moveBooking, validateSession } from '../src/services/bookings.js'
import { readStored, writeStored } from '../src/services/storage.js'
import { api } from '../src/services/api.js'

test('booking lifecycle keeps a session in exactly one group without mutating previous state', () => {
  const booking = { id: 'test', status: 'pending', date: '2099-10-26', time: '14:30' }
  const initial = { ...emptyBookings, pending: [booking] }
  const confirmed = moveBooking(initial, booking, 'upcoming')
  assert.equal(initial.pending.length, 1)
  assert.equal(confirmed.pending.length, 0)
  assert.equal(confirmed.upcoming[0].status, 'confirmed')
  const completed = moveBooking(confirmed, confirmed.upcoming[0], 'completed')
  assert.equal(completed.upcoming.length, 0)
  assert.equal(completed.completed[0].status, 'completed')
  assert.equal(moveBooking(completed, completed.completed[0], 'completed').completed.length, 1)
})

test('booking validation rejects past, missing and conflicting slots but permits editing the same booking', () => {
  const booking = { id: 'one', date: '2099-10-26', time: '14:30' }
  const bookings = { ...emptyBookings, pending: [booking] }
  assert.match(validateSession(bookings, '2000-01-01', '12:00'), /future/)
  assert.match(validateSession(bookings, '', ''), /future/)
  assert.match(validateSession(bookings, booking.date, booking.time), /already/)
  assert.equal(validateSession(bookings, booking.date, booking.time, booking.id), '')
  assert.equal(validateSession(bookings, booking.date, '15:30'), '')
})

test('storage falls back on broken JSON or wrong shape and reports blocked writes', () => {
  let stored = '{broken'
  globalThis.localStorage = {
    getItem: () => stored,
    setItem: (_key, value) => { stored = value },
  }
  assert.deepEqual(readStored('bookings', emptyBookings), emptyBookings)
  stored = '{"pending":null}'
  assert.deepEqual(readStored('bookings', emptyBookings), emptyBookings)
  assert.equal(writeStored('bookings', emptyBookings), true)
  assert.deepEqual(readStored('bookings', emptyBookings), emptyBookings)
  globalThis.localStorage = {
    getItem() { throw new Error('Blocked') },
    setItem() { throw new Error('Quota exceeded') },
  }
  assert.equal(readStored('user', null), null)
  assert.equal(writeStored('bookings', emptyBookings), false)
  delete globalThis.localStorage
})

test('student directory filters before pagination and keeps rating order', async () => {
  const first = await api.get('students', { params: { campus: 'Punjab', sort: 'teachingRating', order: 'desc', pageSize: 2 } })
  assert.equal(first.items.length, 2)
  assert.ok(first.items.every((student) => student.campus === 'Punjab'))
  assert.ok(first.items[0].teachingRating >= first.items[1].teachingRating)
  const second = await api.get('students', { params: { campus: 'Punjab', sort: 'teachingRating', order: 'desc', page: 2, pageSize: 2 } })
  assert.equal(first.total, second.total)
  assert.ok(second.items.every((student) => !first.items.some((other) => other.id === student.id)))
  const none = await api.get('students', { params: { q: 'no-such-student-xyz' } })
  assert.deepEqual(none, { items: [], total: 0 })
})
