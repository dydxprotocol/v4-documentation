# Peering Directly with Order Gateway

For improved order latency of the network, the community might spin up an order gateway node to directly peer with. A chain coordination party may share this in the form of `$gateway_node_id@$gateway_ip_address:$port`.

There are 2 options to peer directly with the gateway node:

## Option A: Gateway -> Validator

- Share the full peering info of your validator node (`node_id@ip_address:port`) with the coordination party, which can be added as a `persistent_peer` to the gateway node. It's important that raw IP address (as opposed to a loadbalancer URL) of the validator node (as opposed to a sentry node) is shared. This ensures that the a direction connection can be maintained across node restarts.
  - If your IP or node ID changes due to node migration, please inform the coordination party.  
- Add the gateway `node_id` as a private and unconditional peer. This ensure that the gateway node is not subject to regualr peer # limits, and is not broadcasted to the rest of the network.

```bash
--p2p.private_peer_ids="$gateway_node_id,..."
--p2p.unconditional_peer_ids="$gateway_node_id,..."
```

## Option B: Validator -> Gateway

- Share the `node_id` (IP not required) of your validator node with the coordination party. It's important to share the `node_id` of the validator node, as opposed to a sentry node. This can be added to the gateway node as `unconditional_peer`.
- Add the gateway node as a persistent and private peer to the validator node:

```bash
--p2p.private_peer_ids="$gateway_node_id,..."
--p2p.persistent_peers="$gateway_node_id@$gateway_ip_address:$port,..."
```
