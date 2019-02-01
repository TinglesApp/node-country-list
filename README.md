# node-country-list
translate country Alpha-2 code to country name in 100+ languages

# setup
```bash
npm install node-country-list
```

# example
```javascript
const Countries = require('node-country-list');

// Countries.get(alpha2Code: string, langCode: string): string
Countries.get('us', 'de'); // Vereinigte Staaten
Countries.get('FR', 'ZH'); // 法国
Countries.get('us', 'zh-hans'); // 美国
Countries.get('us', 'zh-hant'); // 美國
Countries.get('something', 'unknown'); // undefined
```

# please note
* library is using lazy loading for language data to safe on startup and overall memory footprint
* it is nodejs library - `fs` and `path` are required

# supported language codes
* af
* ak
* am
* ar
* as
* az
* be
* bg
* bm
* bn
* bo
* br
* bs
* ca
* ce
* cs
* cy
* da
* de
* dz
* ee
* el
* en
* eo
* es
* et
* eu
* fa
* ff
* fi
* fo
* fr
* fy
* ga
* gd
* gl
* gu
* gv
* ha
* he
* hi
* hr
* hu
* hy
* id
* ig
* ii
* is
* it
* ja
* ka
* ki
* kk
* kl
* km
* kn
* ko
* ks
* kw
* ky
* lb
* lg
* ln
* lo
* lt
* lu
* lv
* mg
* mk
* ml
* mn
* mr
* ms
* mt
* my
* nb
* nd
* ne
* nl
* nn
* no
* om
* or
* os
* pa
* pl
* ps
* pt
* qu
* rm
* rn
* ro
* ru
* rw
* se
* sg
* sh
* si
* sk
* sl
* sn
* so
* sq
* sr
* sv
* sw
* ta
* te
* th
* ti
* tl
* to
* tr
* ug
* uk
* ur
* uz
* vi
* yi
* yo
* zh
* zh-hans
* zh-hant
* zu

# sources
* [country-list](http://github.com/umpirsky/country-list) datafiles
* [wikipedia](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) verification
* [cia world factbook](https://www.cia.gov/library/publications/the-world-factbook/appendix/appendix-d.html) verification
