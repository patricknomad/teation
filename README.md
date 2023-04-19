# Teation — Dive into conversations

> *Teation is in early development. It was created in a couple days by [Patrick Nomad](https://twitter.com/nomad_patrick) as a hobby project. Some of its parts were quickly hacked together for an initial proof of concept. Refactoring is in the [roadmap](./docs/roadmap.md#ongoing-refactoring). Feel like contributing? Checkout [the contribution note](./docs/development.md#contributions) in the development guide.*

[Teation](https://teation.com) allows you to gain insight from thoughtful conversations.

Long discussions such as the ones found in podcasts are great. The participants and length of certain podcasts allow for conversations to develop into thought-provoking insights. However these insightful snippets are often hard to find — hidden within thousands of hours of conversation.

Teation uses artificial intelligence to understand conversations in order to find insightful information.

## Getting Started

A hosted version of Teation can be found at [teation.com](https://teation.com).

Looking for development guides? Check out [development](./docs/development.md).

## How It Works

Teation uses a transformer retriever/reader pipeline in order to provide semantic search through an underlying question answering capability. When someone asks a question on the Teation website, the following events take place:

* **Retriever**: Podcast transcriptions are searched using [BM25](https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables). Top results are forwarded to the reader step. _(in the future this will be switched for [an embedded vector-based search](./docs/roadmap.md#vector-embedding--llm))_.
* **Reader**: Top results are then submitted to a language model for inference with the original question. The language model returns answers to the question. Each answer has a score, and the transcript source. The current language model is based on [RoBERTa](https://ai.facebook.com/blog/roberta-an-optimized-method-for-pretraining-self-supervised-nlp-systems/) fine-tuned with [SQuAD2.0](https://rajpurkar.github.io/SQuAD-explorer/) for question answering.

Top results from the reader undergoes normalization:

* **Alignment**: Results are processed with a few adjustments required by this early proof of concept. Some of these adjustments include timing tuning, and adding/removing segments.
* **Response**: The resulting answers are then sorted by score, combined by video source, and the segments are returned for frontend consumption.

The frontend is developed with [SveleteKit](https://kit.svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/).

[Caddy](https://caddyserver.com/) is used to proxy requests to SvelteKit, and [Cloudflare](https://cloudflare.com) as CDN.

## Roadmap

So many possible changes! Check out the [roadmap](./docs/roadmap.md).

## Documentation

Documentation is still a work in progress. A bit of refactoring is still required before writing getting started instructions for development. Adding more documentation is in the [roadmap](./docs/roadmap.md#documentation).

For now, some useful information can be found in the [development](./docs/development.md) and [architecture](./docs/architecture.md) pages.

## Contributions

Feel like helping out? Check out the [contribution](./docs/development.md#contributions) notes.

## Questions?

Feel free to message [Patrick Nomad](https://twitter.com/nomad_patrick) on Twitter, or open an issue on GitHub.
