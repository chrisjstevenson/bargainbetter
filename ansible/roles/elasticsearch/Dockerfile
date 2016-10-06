FROM elasticsearch:2.3.3

RUN bin/plugin install royrusso/elasticsearch-HQ
RUN bin/plugin install license
RUN bin/plugin install marvel-agent
RUN bin/plugin install https://github.com/NLPchina/elasticsearch-sql/releases/download/2.3.3.0/elasticsearch-sql-2.3.3.0.zip
RUN bin/plugin install mobz/elasticsearch-head
#incompatable RUN bin/plugin install https://github.com/timschlechter/swagger-for-elasticsearch/raw/master/dist/swagger-for-elasticsearch-2.2.1.zip
RUN bin/plugin install polyfractal/elasticsearch-inquisitor
RUN bin/plugin install lmenezes/elasticsearch-kopf/v2.1.2
RUN bin/plugin install graph