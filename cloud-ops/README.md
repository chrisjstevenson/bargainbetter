# quick reference

deploy haproxy changes
ansible-playbook install-haproxy.yml -e 'hosts=do1'

deploy the site to staging - docker image needs to be updated in registry
ansible-playbook deploy-bargainbetter-ui.yml -e 'hosts=do2'