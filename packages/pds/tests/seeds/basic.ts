import { SeedClient } from './client'

export default async (sc: SeedClient) => {
  await sc.createAccount('alice', users.alice)
  await sc.createAccount('bob', users.bob)
  await sc.createAccount('carol', users.carol)
  await sc.createAccount('dan', users.dan)
  const alice = sc.dids.alice
  const bob = sc.dids.bob
  const carol = sc.dids.carol
  const dan = sc.dids.dan

  await sc.createProfile(
    alice,
    users.alice.displayName,
    users.alice.description,
  )
  await sc.createProfile(bob, users.bob.displayName, users.bob.description)
  await sc.follow(alice, sc.userRef(bob))
  await sc.follow(alice, sc.userRef(carol))
  await sc.follow(alice, sc.userRef(dan))
  await sc.follow(carol, sc.userRef(alice))
  await sc.follow(bob, sc.userRef(alice))
  await sc.follow(bob, sc.userRef(carol))
  await sc.follow(dan, sc.userRef(bob))
  await sc.post(alice, posts.alice[0])
  await sc.post(bob, posts.bob[0])
  await sc.post(carol, posts.carol[0])
  await sc.post(dan, posts.dan[0])
  await sc.post(dan, posts.dan[1], [
    {
      index: [0, 18],
      type: 'mention',
      value: alice,
    },
  ])
  await sc.post(alice, posts.alice[1])
  await sc.post(bob, posts.bob[1])
  await sc.post(alice, posts.alice[2])
  await sc.like(bob, sc.posts[alice][1].ref)
  await sc.like(bob, sc.posts[alice][2].ref)
  await sc.like(carol, sc.posts[alice][1].ref)
  await sc.like(carol, sc.posts[alice][2].ref)
  await sc.like(dan, sc.posts[alice][1].ref)
  await sc.reply(
    bob,
    sc.posts[alice][1].ref,
    sc.posts[alice][1].ref,
    replies.bob[0],
  )
  await sc.reply(
    carol,
    sc.posts[alice][1].ref,
    sc.posts[alice][1].ref,
    replies.carol[0],
  )
  await sc.reply(
    alice,
    sc.posts[alice][1].ref,
    sc.replies[bob][0].ref,
    replies.alice[0],
  )
  await sc.repost(carol, sc.posts[dan][1].ref)
  await sc.repost(dan, sc.posts[alice][1].ref)

  await sc.createBadge(bob, 'employee')
  await sc.createBadge(bob, 'tag', 'cool')
  await sc.createBadge(carol, 'tag', 'neat')
  await sc.createBadge(carol, 'tag', 'cringe')

  await sc.offerBadge(bob, alice, sc.badges[bob][0])
  await sc.offerBadge(bob, alice, sc.badges[bob][1])
  await sc.offerBadge(bob, bob, sc.badges[bob][1])
  await sc.offerBadge(bob, carol, sc.badges[bob][1])
  await sc.offerBadge(bob, dan, sc.badges[bob][1])
  await sc.offerBadge(carol, alice, sc.badges[carol][0])

  await sc.acceptBadge(alice, sc.badges[bob][1], sc.badgeOffers[bob][alice][1])
  await sc.acceptBadge(bob, sc.badges[bob][1], sc.badgeOffers[bob][bob][0])
  await sc.acceptBadge(carol, sc.badges[bob][1], sc.badgeOffers[bob][carol][0])
  await sc.acceptBadge(
    alice,
    sc.badges[carol][0],
    sc.badgeOffers[carol][alice][0],
  )

  return sc
}

const users = {
  alice: {
    email: 'alice@test.com',
    username: 'alice.test',
    password: 'alice-pass',
    displayName: 'ali',
    description: 'its me!',
  },
  bob: {
    email: 'bob@test.com',
    username: 'bob.test',
    password: 'bob-pass',
    displayName: 'bobby',
    description: 'hi im bob',
  },
  carol: {
    email: 'carol@test.com',
    username: 'carol.test',
    password: 'carol-pass',
    displayName: undefined,
    description: undefined,
  },
  dan: {
    email: 'dan@test.com',
    username: 'dan.test',
    password: 'dan-pass',
    displayName: undefined,
    description: undefined,
  },
}

export const posts = {
  alice: ['hey there', 'again', 'yoohoo'],
  bob: ['bob back at it again!', 'bobby boy here', 'yoohoo'],
  carol: ['hi im carol'],
  dan: ['dan here!', '@alice.bluesky.xyz is the best'],
}

export const replies = {
  alice: ['thanks bob'],
  bob: ['hear that'],
  carol: ['of course'],
}