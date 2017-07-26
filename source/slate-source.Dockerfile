FROM slate-base

COPY ./ /app/slate/source/

ENTRYPOINT ["bundle", "exec", "middleman", "server"]