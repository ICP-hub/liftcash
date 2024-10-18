cargo build --release --target wasm32-unknown-unknown --package Community_Backend
cargo build --release --target wasm32-unknown-unknown --package Economy_Backend
cargo build --release --target wasm32-unknown-unknown --package User_Backend

candid-extractor target/wasm32-unknown-unknown/release/Community_Backend.wasm >src/Community_Backend/Community_Backend.did
candid-extractor target/wasm32-unknown-unknown/release/Economy_Backend.wasm >src/Economy_Backend/Economy_Backend.did
candid-extractor target/wasm32-unknown-unknown/release/User_Backend.wasm >src/User_Backend/User_Backend.did

dfx deploy 
