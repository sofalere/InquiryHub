#run with `bash filename`

createdb request-bin
psql -d request-bin < schema.sql
psql -d request-bin < seed-data.sql

