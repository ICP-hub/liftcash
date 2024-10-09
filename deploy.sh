cargo build --release --target wasm32-unknown-unknown --package Lift_Cash_backend

candid-extractor target/wasm32-unknown-unknown/release/Lift_Cash_backend.wasm >src/Lift_Cash_backend/Lift_Cash_backend.did