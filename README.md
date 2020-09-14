# abcd UI

This UI is developed for several objectives

- Educational purpose: manipulate & observe the behavior of a cluster using raft consensus protocol
- Monitoring purpose: observe the behavior of a cluster under heavy load, split brain, loss of leader, etc...
- Control purpose: add nodes & control their properties (e.g timeouts, network latency, peers, ...)
- Testing / Debugging purpose: replay logs to better troubleshoot why a value is not consistent

# Getting Started

Install dependencies

`yarn install``

Start the dev server

`yarn start`

Go to http://localhost:3000/

# TechStack

- ReactJS (TypeScript)
- ReactRedux
- ReduxObservables (RxJS)

# Implemented

- index.html
- react basic start and redering with auto TypeScript / TSX transpiling
- redux boilerplate with state, interface, reducer, epic, components, containers

# Next Steps

## Basic UI

- Connect to a node
- Display logs for this node
- Connect to knownPeers
- Display logs in tabs for all peers
- Display graphical nodes
- Display graphical connections between peers

## Basic Graphics

- Visualize heartbeats
- Visualize nodes states (leader, follower, candidate)
- Visualize callForVotes (request & responses considering the `voteGranted` value)

## Advanced Graphics

- Show store
- Show WAL
- Show store & WAL sync state
- Show nodes store sync state
- Show nodes WAL sync state

# Know Issues

- The code base has used for so many projects, not all the code is used (yet), some components are just examples
- Unit tests do not pass (stack is not tested since it's not the goal of this project, maybe one day)