// (c) 2000-2009 by Gemius SA

function gemius_parameters() {
        var d=document;
        var href=new String(d.location.href);
        var ref;
        var f=0;
        var fv='-';
        if (d.referrer) { ref=new String(d.referrer); } else { ref=''; }
        if (typeof Error!='undefined') {
                var fo;
                eval('try { f=(d==top.document)?1:2; if (typeof top.document.referrer=="string") { ref=top.document.referrer } } catch(e) {f=3;}');
                eval('try { fv=navigator.plugins["Shockwave Flash"].description; } catch (e) {}');
                eval('if (typeof ActiveXObject!="undefined") { try { fo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"); } catch(e) { try { fo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"); fv="X"; fo.AllowScriptAccess="always"; } catch(e) { if (fv=="X") { fv="WIN 6,0,20,0"; }} try { fo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); } catch(e) {} } if ((fv=="-" || fv=="X") && fo) { fv=fo.GetVariable("$version"); }}');
        }
        var url='&fr='+f+'&fv='+escape(fv)+'&tz='+(new Date()).getTimezoneOffset()+'&href='+escape(href.substring(0,499))+'&ref='+escape(ref.substring(0,499));
        if (screen) {
                var s=screen;
                if (s.width) url+='&screen='+s.width+'x'+s.height;
                if (s.colorDepth) url+='&col='+s.colorDepth;
        }
        return url;
}
function gemius_hit_int(list,rfrom,rto) {
        var gp = (document.location && document.location.protocol && document.location.protocol=='https:')?'https://':'http://';
        var gh,go;
        if (typeof gemius_hitcollector=='undefined') {
                gh = 'pro.hit.gemius.pl';
        } else {
                gh = gemius_hitcollector;
        }
        var gu = gp+gh+'/_'+(new Date()).getTime()+'/redot.gif?';
        if (typeof window.gemius_prot_cnt == 'undefined') {
                window.gemius_prot_cnt=0;
        }
        if (typeof gemius_prot_cnt == 'undefined') {
                gemius_prot_cnt=0;
        }
        if (window.gemius_prot_cnt<=gemius_prot_cnt) {
                go=1;
                window.gemius_prot_cnt++;
        } else {
                go=0;
        }
        gemius_prot_cnt++;
        if (rfrom==0 && rto==0) {
                gu += 'l=20&id='+list;
        } else {
                gu += 'l=21';
                for (var i=rfrom ; i<rto ; i++) {
                        gu += '&id='+list[i];
                }
        }
        gu += gemius_parameters();
        if (typeof window.gemius_hit_images == 'undefined') {
                window.gemius_hit_images = new Array();
        }
        var gl = window.gemius_hit_images.length;
        window.gemius_hit_images[gl]=new Image();
        if (go) {
                window.gemius_hit_images[gl].src = gu;
        } else {
                window.gemius_hit_images[gl].src = gu.replace(/id=/,'id=DBL_');
        }
}
function gemius_hit() {
        for (i=0 ; i<arguments.length ; i+=5) {
                if (i+5<arguments.length) {
                        gemius_hit_int(arguments,i,i+5);
                } else {
                        gemius_hit_int(arguments,i,arguments.length);
                }
        }
}
if (typeof gemius_identifier != 'undefined') {
        gemius_hit_int(gemius_identifier,0,0);
        gemius_identifier = 'USED_'+gemius_identifier;
}
