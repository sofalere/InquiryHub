#run with `bash filename`

createdb request-bin
psql -d request-bin < pg-schema.sql
psql -d request-bin < pg-seed-data.sql
