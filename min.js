class GappsDapi{constructor(e=""){this.base=this.getBase(e)||this.createBase(e)}createBase(e){let t={method:"POST",contentType:"application/json",payload:JSON.stringify({mimeType:"application/vnd.google-apps.folder",name:e}),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}},o=null;try{o=JSON.parse(UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/",t).getContentText())}catch(e){console.log(e)}return o}getBase(e){const t=`https://www.googleapis.com/drive/v3/files/?q=name='${e}' and trashed=false and mimeType = 'application/vnd.google-apps.folder'`,o={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let r=null;try{r=JSON.parse(UrlFetchApp.fetch(t,o).getContentText()).files[0]}catch(e){console.log(e)}return r}deleteBase(){const e=`https://www.googleapis.com/drive/v3/files/${this.base.id}`,t={method:"DELETE",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let o=null;try{o=UrlFetchApp.fetch(e,t).getContentText()}catch(e){console.log(e)}}findPosts(e=[],t=20){let o="";return e.forEach((function(t,r){let s="";s+=`fullText contains '%22${function(e){let t="";return Object.entries(e).forEach((([e,o])=>t+=`${e}:${o}`)),t}(t)}%22'`,e.length>1?o+=r+1!=e.length?`(${s}) or `:`(${s})`:o=s})),o={values:`and (${o})`},this.getPosts(t,o)}getPosts(e=20,t=""){let o="";"string"==typeof t?o="orderBy=createdTime desc&":t=t.values;const r=`https://www.googleapis.com/drive/v3/files/?pageSize=${e}&${o}q='${this.base.id}' in parents and trashed%3Dfalse ${t}`,s={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let n=null;try{n=JSON.parse(UrlFetchApp.fetch(r,s).getContentText()).files}catch(e){console.log(e)}return n}getPostById(e){const t=`https://www.googleapis.com/drive/v3/files/${e}?fields=*`,o={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let r=null;try{if(r=JSON.parse(UrlFetchApp.fetch(t,o).getContentText()),!r?.parents?.includes(this.base.id))return null}catch(e){console.log(e)}return r}getValuePost(e){const t=`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,o={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let r=null;if(!this.getPostById(postId))return r;try{r=UrlFetchApp.fetch(t,o).getContentText()}catch{}return r}createPost(e=""){const t=Utilities.base64Encode((new Date).valueOf())+Math.floor(999999*Math.random()),o={contentType:"application/json",method:"POST",payload:JSON.stringify({mimeType:"text/plain",parents:[this.base.id],name:t}),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let r;try{return r=JSON.parse(UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/",o).getContentText()),e?this.editPost(r.id,e):r}catch{}}deletePost(e){const t=`https://www.googleapis.com/drive/v3/files/${e}`,o={method:"DELETE",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let r=null;if(!this.getPostById(e))return r;try{r=UrlFetchApp.fetch(t,o).getResponseCode()}catch(e){console.log(e)}return r}editPost(e,t=""){const o=`https://www.googleapis.com/upload/drive/v3/files/${e}`,r={method:"PATCH",contentType:"text/plain",payload:JSON.stringify(t),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};let s=null;if(!this.getPostById(e))return s;try{s=JSON.parse(UrlFetchApp.fetch(o,r).getContentText())}catch(e){console.log(e)}return s}}function init(e){return new GappsDapi(e)}
