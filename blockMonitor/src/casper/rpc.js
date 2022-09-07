const fetch = require('node-fetch')

let id = 0

const getFetchOptions = (id, method, params) => ({
  method: 'post', // set method to POST
  headers: { 'Content-Type': 'application/json' }, // set content type
  body: JSON.stringify({ id, jsonrpc: '2.0', method, params }), // prepare data to send
})

const getRPCData = async (method, params) =>
  (await fetch(RPC.url, getFetchOptions(++id, method, params))).json() //retrieve RPC data from server

const RPC = {
  url: '', // server from Active peer list
  setURL: (url) => {
    RPC.url = url
  },
  putDeploy: async (deploy) =>
    (await getRPCData('account_put_deploy', { deploy })).result.deploy_hash,
  getDeployInfo: async (deploy_hash) =>
    (await getRPCData('info_get_deploy', { deploy_hash })).result.deploy,
  getBlockInfo: async (Hash) =>
    (await getRPCData('chain_get_block', { block_identifier: { Hash } })).result
      .block,
  getBlockInfoByHeight: async (Height) =>
    (await getRPCData('chain_get_block', { block_identifier: { Height } }))
      .result.block,
  getLatestBlock: async (_) =>
    (await getRPCData('chain_get_block')).result.block,
  getPeers: async (_) => (await getRPCData('info_get_peers')).result.peers,
  getStatus: async (_) => (await getRPCData('info_get_status')).result,
  getAuctionInfo: async (_) =>
    (await getRPCData('state_get_auction_info')).result.auction_state,
  getStateRootHash: async (block_hash) =>
    (await getRPCData('chain_get_state_root_hash', { block_hash })).result
      .state_root_hash,
  getStateItem: async (state_root_hash, key, path) => {
    try {
      const data = await getRPCData('state_get_item', {
        state_root_hash,
        key,
        path,
      })
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  getAccountBalance: async (state_root_hash, purse_uref) =>
    (await getRPCData('state_get_balance', { state_root_hash, purse_uref }))
      .result.balance_value,
  getBlockTransfers: async (Hash) =>
    (
      await getRPCData('chain_get_block_transfers', {
        block_identifier: { Hash },
      })
    ).result.transfers,
  getAccountInfo: async (Hash, public_key) => {
    const data = await getRPCData('state_get_account_info', {
      block_identifier: { Hash },
      public_key,
    })
    delete data.result.merkle_proof
    return data && data.result && data.result.account
      ? data.result.account
      : null
  },
  getDictItem: async (state_root_hash, seed_uref, dictionary_item_key) =>
    (
      await getRPCData('state_get_dictionary_item', {
        state_root_hash,
        dictionary_identifier: { URef: { seed_uref, dictionary_item_key } },
      })
    ).result.stored_value,
}

module.exports = (URL) => {
  RPC.setURL(URL)
  //http://3.14.161.135:7777/rpc
  return RPC
}
