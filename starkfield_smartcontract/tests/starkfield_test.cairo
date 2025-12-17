use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use starkfield_smartcontract::{
    IStarkFieldDispatcher, IStarkFieldDispatcherTrait,
};

fn deploy_starkfield() -> ContractAddress {
    let contract = declare("StarkField").unwrap().contract_class();
    let (address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    address
}

#[test]
fn test_register_and_get_user() {
    let addr = deploy_starkfield();
    let d = IStarkFieldDispatcher { contract_address: addr };

    d.register_user('Alice');
    let name = d.get_user_name(addr);
    assert(name == 'Alice', 'Name mismatch');

    let total_users = d.get_total_users();
    assert(total_users == 1, 'Total users mismatch');
}

#[test]
fn test_create_and_purchase_listing() {
    let addr = deploy_starkfield();
    let d = IStarkFieldDispatcher { contract_address: addr };

    d.register_user('Seller');
    // create listing with price 10
    let listing_id = d.create_listing('Apples', 10);
    assert(listing_id == 1, 'Listing id mismatch');

    // price readback
    let price = d.get_listing_price(listing_id);
    assert(price == 10, 'Price mismatch');

    // total listings incremented
    let total = d.get_total_listings();
    assert(total == 1, 'Total listings mismatch');
}

