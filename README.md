# Nest KMS Wallet Storage gRPC Server

This server is responsible for storing and retrieving BIP39 wallet data from MongoDB.

The mnemonic phrase is encrypted/decrypted using AWS KMS and stored in the database.

gRPC is used as the communication protocol between the server and the client.

> ⚠️ **Warning:** Please note that this server is not production ready. It is only for development purposes. Please make your changes for security before using it in production.

## Installation

```bash
$ yarn
```

## Generate proto files for typescript

Install protobuf compiler (if not exists) and be sure version 3+

https://grpc.io/docs/protoc-installation/

```bash
protoc --version
```

Generate protobuf files (be sure src/proto/compile.proto.sh has execution permission):

```bash
yarn proto:generate
```

## Generate certificates and enabling ssl

Install openssl (if not exists)

Generate certificates (be sure src/certs/generate-certs.sh has execution permission):

```bash
yarn certs:generate
```

To enable ssl through the app, set the environment variable `ENABLE_SSL=true`

> ⚠️ **Warning:** Please note that the certificates generated are for development purposes only. Do not use them in production. Check shell script for more details.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
