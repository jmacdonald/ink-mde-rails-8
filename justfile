pin library:
  docker compose run --rm app bin/importmap pin {{ library }}

run:
  docker compose run --rm app bundle
  docker compose up
