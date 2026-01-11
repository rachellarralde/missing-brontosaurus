#! /bin/bash

cd ../missing-brontosaurus-sanity && npx sanity schema extract --enforce-required-fields

npx sanity typegen generate
