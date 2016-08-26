Use the ansible-playbook
```
ansible-playbook -i inventory.py deploy-bargain-better-ui.yml
```

```
docker build -t chrisjstevenson/bargain-better-ui .
docker run -p 9002:9002 -d --name bargain-better-ui chrisjstevenson/bargain-better-ui
```
