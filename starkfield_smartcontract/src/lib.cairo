use starknet::ContractAddress;

/// Interface for the StarkField contract
#[starknet::interface]
pub trait IStarkField<TContractState> {
    fn register_user(ref self: TContractState, name: felt252);
    fn get_user_name(self: @TContractState, user_address: ContractAddress) -> felt252;
    fn create_listing(ref self: TContractState, title: felt252, price: u256) -> u256;
    fn get_listing_price(self: @TContractState, listing_id: u256) -> u256;
    fn purchase_listing(ref self: TContractState, listing_id: u256) -> u256;
    fn get_total_users(self: @TContractState) -> u256;
    fn get_total_listings(self: @TContractState) -> u256;
}

/// Main StarkField contract
#[starknet::contract]
mod StarkField {
    use starknet::{ContractAddress, get_caller_address};
    use starknet::storage::{
        StorageMapReadAccess,
        StorageMapWriteAccess,
        StoragePointerReadAccess,
        StoragePointerWriteAccess,
        Map
    };

    #[storage]
    struct Storage {
        // User management - simple storage
        user_names: Map<ContractAddress, felt252>,
        user_registered: Map<ContractAddress, bool>,
        
        // Listing management
        listing_titles: Map<u256, felt252>,
        listing_prices: Map<u256, u256>,
        listing_sellers: Map<u256, ContractAddress>,
        listing_exists: Map<u256, bool>,
        
        // Transaction management
        transaction_listings: Map<u256, u256>,
        transaction_buyers: Map<u256, ContractAddress>,
        transaction_exists: Map<u256, bool>,
        
        // Counters
        total_users: u256,
        total_listings: u256,
        total_transactions: u256,
        listing_counter: u256,
        transaction_counter: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.total_users.write(0);
        self.total_listings.write(0);
        self.total_transactions.write(0);
        self.listing_counter.write(0);
        self.transaction_counter.write(0);
    }

    #[abi(embed_v0)]
    impl StarkFieldImpl of super::IStarkField<ContractState> {
        fn register_user(ref self: ContractState, name: felt252) {
            let caller = get_caller_address();
            
            // Check if already registered
            if self.user_registered.read(caller) {
                return;
            };
            
            self.user_names.write(caller, name);
            self.user_registered.write(caller, true);
            
            let mut count = self.total_users.read();
            count += 1;
            self.total_users.write(count);
        }
        
        fn get_user_name(self: @ContractState, user_address: ContractAddress) -> felt252 {
            assert(self.user_registered.read(user_address), 'Not registered');
            self.user_names.read(user_address)
        }
        
        fn create_listing(ref self: ContractState, title: felt252, price: u256) -> u256 {
            let caller = get_caller_address();
            assert(self.user_registered.read(caller), 'Must register');
            assert(price > 0, 'Price>0');
            
            let mut listing_id = self.listing_counter.read();
            listing_id += 1;
            self.listing_counter.write(listing_id);
            
            self.listing_titles.write(listing_id, title);
            self.listing_prices.write(listing_id, price);
            self.listing_sellers.write(listing_id, caller);
            self.listing_exists.write(listing_id, true);
            
            let mut count = self.total_listings.read();
            count += 1;
            self.total_listings.write(count);
            
            listing_id
        }
        
        fn get_listing_price(self: @ContractState, listing_id: u256) -> u256 {
            assert(self.listing_exists.read(listing_id), 'No listing');
            self.listing_prices.read(listing_id)
        }
        
        fn purchase_listing(ref self: ContractState, listing_id: u256) -> u256 {
            let caller = get_caller_address();
            assert(self.user_registered.read(caller), 'Reg first');
            assert(self.listing_exists.read(listing_id), 'No listing');
            
            let seller = self.listing_sellers.read(listing_id);
            assert(seller != caller, 'Own listing');
            
            let mut transaction_id = self.transaction_counter.read();
            transaction_id += 1;
            self.transaction_counter.write(transaction_id);
            
            self.transaction_listings.write(transaction_id, listing_id);
            self.transaction_buyers.write(transaction_id, caller);
            self.transaction_exists.write(transaction_id, true);
            
            let mut count = self.total_transactions.read();
            count += 1;
            self.total_transactions.write(count);
            
            transaction_id
        }
        
        fn get_total_users(self: @ContractState) -> u256 {
            self.total_users.read()
        }
        
        fn get_total_listings(self: @ContractState) -> u256 {
            self.total_listings.read()
        }
    }
}
