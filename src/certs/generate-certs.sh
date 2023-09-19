# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

# Directory to write generated certificates
OUT_DIR="${ROOT_DIR}/src/certs/generated"

# Clean all existing generated files
rm -r "${OUT_DIR}"
mkdir "${OUT_DIR}"
cd "${OUT_DIR}"

echo "Generate CA key ..."
openssl genrsa -passout pass:1111 -des3 -out ca.key 4096

echo "Generate CA certificate ..."
openssl req -passin pass:1111 -new -x509 -days 365 -key ca.key -out ca.crt -subj  "/C=US/ST=SomeState/L=SomeCity/O=SomeOrganization/OU=SomeOrganizationalUnit/CN=localhost"

echo "Generate server key ..."
openssl genrsa -passout pass:1111 -des3 -out server.key 4096

echo "Generate server signing request ..."
openssl req -passin pass:1111 -new -key server.key -out server.csr -subj  "/C=US/ST=SomeState/L=SomeCity/O=SomeOrganization/OU=Server/CN=localhost"

echo "Self-sign server certificate ..."
openssl x509 -req -passin pass:1111 -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

echo "Remove passphrase from server key ..."
openssl rsa -passin pass:1111 -in server.key -out server.key

echo "Generate client key ..."
openssl genrsa -passout pass:1111 -des3 -out client.key 4096

echo "Generate client signing request ..."
openssl req -passin pass:1111 -new -key client.key -out client.csr -subj  "/C=US/ST=SomeState/L=SomeCity/O=SomeOrganization/OU=Client/CN=localhost"

echo "Self-sign client certificate ..."
openssl x509 -passin pass:1111 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt

echo "Remove passphrase from client key ..."
openssl rsa -passin pass:1111 -in client.key -out client.key