if [ -z "$SSH_PRIVATE_KEY" ]; then
    echo "SSH_PRIVATE_KEY environment variable not set. This is required to clone @nimi.io/card npm package."
    exit 1
fi

if [ -z "$SSH_PUBLIC_KEY" ]; then
    echo "SSH_PUBLIC_KEY environment variable not set. This is required to clone @nimi.io/card npm package."
    exit 1
fi

# Authorize SSH Host
ssh-keyscan github.com > ~/.ssh/known_hosts
# Add the keys and set permissions
echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa && \
  echo "$SSH_PUBLIC_KEY" > ~/.ssh/id_rsa.pub && \
  chmod 600 ~/.ssh/id_rsa && \
  chmod 600 ~/.ssh/id_rsa.pub