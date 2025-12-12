FROM ubuntu:latest
USER root
ENV DATABASE_PASSWORD=supersecret123
ENV AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
EXPOSE 22
RUN apt-get update && apt-get install -y curl wget
COPY . /app
WORKDIR /app
CMD ["node", "server.js"]