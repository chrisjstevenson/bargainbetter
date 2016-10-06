FROM kibana:latest

RUN gosu kibana kibana plugin -i elastic/sense
RUN gosu kibana kibana plugin -i elasticsearch/marvel/latest
RUN gosu kibana kibana plugin -i elasticsearch/graph/latest
