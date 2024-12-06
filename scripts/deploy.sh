set -a
source .env
set +a

cargo build --release --target wasm32-unknown-unknown --package Community_Backend
cargo build --release --target wasm32-unknown-unknown --package Economy_Backend

candid-extractor ../target/wasm32-unknown-unknown/release/Community_Backend.wasm > ../src/Community_Backend/Community_Backend.did
candid-extractor ../target/wasm32-unknown-unknown/release/Economy_Backend.wasm > ../src/Economy_Backend/Economy_Backend.did

dfx deploy

