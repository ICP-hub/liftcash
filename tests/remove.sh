
#!/bin/bash

# Define the ending number for the loop
ENDING=500 

# Loop to delete identities
for ((i = 101; i <= ENDING; i++)) 
do
  IDENTITY=$(dfx identity remove "user_$i") 
  echo $IDENTITY
done
