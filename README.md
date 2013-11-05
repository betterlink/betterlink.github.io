Branches
--------------

<dl>
    <dt>master</dt>
    <dd>production website -- gets built automatically on push</dd>
    
    <dt>develop</dt>
    <dd>stable branch</dd>
    <dd>develop here; merge into <code>master</code> when appropriate</dd>
    
    <dt>[other_branches]</dt>
    <dd>all non-immediate development should be done on feature branches</dd>
    <dd>goal: keep <code>develop</code> stable and always available to push
</dl>

Workflow
---------
Develop on feature branch --> Merge into `develop` --> Merge into `master` --> Push `master`
