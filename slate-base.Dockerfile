FROM ruby:2.3

RUN apt-get update
RUN apt-get install -yq ruby ruby-dev build-essential libssl-dev libcurl4-gnutls-dev libexpat1-dev gettext unzip git nodejs \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*
RUN gem install --no-ri --no-rdoc bundler

WORKDIR /app/slate
EXPOSE 4567

RUN mkdir /app/slate/lib
RUN mkdir /app/slate/source

COPY .*/ app/slate/
COPY ./lib /app/slate/lib

RUN bundle install