# Teation AI

## Running

_(If you intend to use GPU, see the [GPU Support](#gpu-support) section below.)_

If it's the **first time running the service** you must create an external network. This allows the UI's docker containers to communicate with the AI's docker containers.

```bash
docker network create external-podcast-project
```

**Anytime the segment data changes, or the first time running the service**, run the initializer script to re-index the segments. To run the script, first start the elasticsearch service.

```bash
# Start elasticsearch, wait until it's healthy, then run the initializer
docker compose up -d elasticsearch
echo "Waiting until elasticsearch is running and healthy…"; while [ "`docker inspect --format '{{ .State.Health.Status }}' ai-elasticsearch-1`" != "healthy" ]; do sleep 2; done; echo "Elasticsearch is running and healthy"; sleep 2
docker compose -f docker-compose.initializer.yml run --rm initializer
```

Finally *start the AI service* (also run this after stopping the service):

```bash
docker compose up -d
```

To stop all services run:
```bash
docker compose stop
```

## GPU Support

See [documentation about GPU support](https://docs.haystack.deepset.ai/docs/enabling-gpu-acceleration) to ensure that the GPU is available on your system.

When using `docker compose up` and `docker compose stop` above, add `-f docker-compose.gpu.yml` to the command to enable GPU support. For example:

```bash
docker compose -f docker-compose.gpu.yml up -d elasticsearch
```