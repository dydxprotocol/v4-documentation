FROM ruby:2.6-slim

WORKDIR /usr/src/slate

EXPOSE 4567

COPY . .

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        nodejs \
    && gem install bundler \
    && bundle install \
    && apt-get remove -y build-essential \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

CMD ["bundle", "exec", "middleman", "server", "--watcher-force-polling"]
