FROM node:10-alpine

# set maintainer
LABEL maintainer "agrajal7@eafit.edu.co"

LABEL maintainer "emontoya@eafit.edu.co"

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

# set a health check
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:8000 || exit 1

# tell docker what port to expose
RUN mkdir -p /opt/app
WORKDIR /opt/app
ADD package.json /opt/app/
RUN npm install
RUN cp -R ./* /opt/app
EXPOSE 8000
CMD ["npm", "start"]