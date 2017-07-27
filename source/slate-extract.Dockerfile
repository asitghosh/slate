FROM slate-base

COPY ./ /app/slate/source/

RUN bundle exec middleman build

RUN ls -lrt /app/slate
