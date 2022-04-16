curl -c ccookie.txt -d "API_KEY_NAME=ACCESS_TOKEN" -d "API_KEY_VALUE=90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ" -u sk_test_51KSmlJGnWsOieF5WQf1WuGIsj7mUJ3n2VnjZX8zKDng3F1TiyIcuI3vbHI29kJ1L32Otnc8p84kmh1HadU7mGLnJ005BV3DxK9 https://spipe.herokuapp.com/

curl https://spipe.herokuapp.com/tokens \
  -u sk_test_51KSmlJGnWsOieF5WQf1WuGIsj7mUJ3n2VnjZX8zKDng3F1TiyIcuI3vbHI29kJ1L32Otnc8p84kmh1HadU7mGLnJ005BV3DxK9: \
  -d "card[number]"=4242424242424242 \
  -d "card[exp_month]"=2 \
  -d "card[exp_year]"=2023 \
  -d "card[cvc]"=314


  curl https://spipe.herokuapp.com/tokens \
   -d "card[number]"=4242424242424242 \
   -d "card[exp_month]"=2 \
   -d "card[exp_year]"=2023 \
   -d "card[cvc]"=313

  curl http://localhost:3000/tokens \
   -d "card[number]"=4242424242424242 \
   -d "card[exp_month]"=2 \
   -d "card[exp_year]"=2023 \
   -d "card[cvc]"=313


  curl http://localhost:3000/tokens \
   -u ACCESS_KEY:90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ \
   -d "card[number]"=4242424242424242 \
   -d "card[exp_month]"=2 \
   -d "card[exp_year]"=2023 \
   -d "card[cvc]"=313


   curl http://localhost:3000/charges \
      -u ACCESS_KEY:90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ \
      -d amount=200 \
      -d currency=brl \
      -d source=tok_1KSsOtGnWsOieF5WCK1Surj7 \
      -d description="My First Test Charge (created for API docs)"

// use as native Stipe proxy with ip rotation
const $inst = axios.create({
    baseURL: config.spipeHost,
    proxy: `http://ACCESS_KEY:${config.spipeAccessKey}@${config.spipeHost}/nativeProxy`,
    timeout: 80000,
    headers: { 'Keep-Alive': 'true' }
})

const $res = axios({
    url: '/token/charge' // create token and charge, returns charges result
    baseURL: config.spipeHost,
    data: {}
})

sk_test_51KSmlJGnWsOieF5WQf1WuGIsj7mUJ3n2VnjZX8zKDng3F1TiyIcuI3vbHI29kJ1L32Otnc8p84kmh1HadU7mGLnJ005BV3DxK9

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



DEP_MODE=test
DEP_LOG=true

API_URL=https://api.stripe.com/v1
ACCESS_KEY=90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ

UA_FRONT_TEST=Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20191102 Firefox/36.0
UA_SERVER_LIVE=Apache/2.4.34 (X11; Linux x86_64) OpenSSL/1.1.1 (internal dummy connection)
UA_SERVER_TEST=Apache/2.4.34 (Ubuntu) OpenSSL/1.1.1 (internal dummy connection)

PROXY_TEST_INDEX=0
PROXY_TEST_SV_INDEX=0
PROXY_SERVER_GROUP=79.23

RSOCK_USER=spipieRocksNET
RSOCK_PASS=289J3298JD9JPOK
RSOCK_PLIST_URL=https://proxy.link/list/personal/169607/a88ae3cb05a308ac3d71087d591f3eda14ee06d5fb2da43a8a6329f26d65b841

MIN_CASHOUT=51
MAX_CASHOUT=119

DELAY_SET_TEST=fast
DELAY_SET_LIVE=slower

REFUND_CHANCE=30
ADDR_SP_CHANCE=30
CHECK_FLV_CHANCE=25

STRIPE_TEST_SK=sk_test_51KSmlJGnWsOieF5WQf1WuGIsj7mUJ3n2VnjZX8zKDng3F1TiyIcuI3vbHI29kJ1L32Otnc8p84kmh1HadU7mGLnJ005BV3DxK9
STRIPE_TEST_PK=pk_test_51KSmlJGnWsOieF5WxtQVFHhH8D5CqBjzVSY7OGizUNqyzHkVVtlB2Z1tCkYM2q36GX4PbmDPvWjRTtvK8zgIjYTy00EtQxCWL9

STRIPE_LIVE_SK_0=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
STRIPE_LIVE_PK_0=pk_live_51KUMzvDp8h2LaQWzhYAtFvSpAwt61vkT7jxil0yH1YLWiqKM2718sZKVFkBKEGFKe0QOEKcQBgjpok85kElBBqkq00MY4mTNri




<div><div><span tabindex="-1"><div class="ContextualLayer-layer--topleft ContextualLayer-layer--anytop ContextualLayer-layer--anyleft ContextualLayer-context--topleft ContextualLayer-context--anytop ContextualLayer-context--anyleft ContextualLayer-container ContextualLayer--pointerEvents" style="inset: 360px auto auto 32px; width: 252px;"><div class="Card-root Card--radius--all Card--shadow--medium db-AccountSwitcher db-AccountSwitcher--entered Box-root Box-hideIfEmpty Box-background--white"><div class="ScrollableMenu db-AccountSwitcher-menu"><ul id="accountSwitcher" role="listbox"><li aria-selected="false" id="accountSwitcher-item-0" role="option"><div><button class="db-AccountSwitcherItem-button"><div class="Box-root Box-background--white Padding-horizontal--8 Padding-vertical--4 Flex-flex Flex-alignItems--center" style="cursor: pointer; user-select: none;"><div class="Box-root Margin-right--8"><div class="Card-root Card--radius--circle Avatar Avatar--size--28 db-AccountSwitcher-image Box-root Box-background--white"><div class="Avatar-inner Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"><div aria-hidden="true" class="SVGInline SVGInline--cleaned SVG Icon Icon--business Icon-color Icon-color--gray300 Box-root Flex-flex"><svg aria-hidden="true" class="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--business-svg Icon-color-svg Icon-color--gray300-svg" height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 7.5V12h10V7.5c.718 0 1.398-.168 2-.468V15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7.032c.602.3 1.282.468 2 .468zM0 3L1.703.445A1 1 0 0 1 2.535 0h10.93a1 1 0 0 1 .832.445L16 3a3 3 0 0 1-5.5 1.659C9.963 5.467 9.043 6 8 6s-1.963-.533-2.5-1.341A3 3 0 0 1 0 3z" fill-rule="evenodd"></path></svg></div></div></div></div><div class="TruncatedText" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="Text-color--default Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--inline">foundys.04</span></div></div></button></div></li><li aria-selected="false" id="accountSwitcher-item-1" role="option"><div><button class="db-AccountSwitcherItem-button"><div class="Box-root Box-background--white Padding-horizontal--8 Padding-vertical--4 Flex-flex Flex-alignItems--center" style="cursor: pointer; user-select: none;"><div class="Box-root Margin-right--8"><div class="Card-root Card--radius--circle Avatar Avatar--size--28 db-AccountSwitcher-image Box-root Box-background--white"><div class="Avatar-inner Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"><img src="https://files.stripe.com/files/MDB8YWNjdF8xS1JSN0ZHVFF4a1Y3MGF5fGZfbGl2ZV83alpvcEVGYWVrNnh5NVQ2VTNLY2VQSWE009C9yqz7W" alt=""></div></div></div><div class="TruncatedText" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="Text-color--default Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--inline">api.foundify.org</span></div></div></button></div></li><li aria-selected="false" id="accountSwitcher-item-2" role="option"><div><button class="db-AccountSwitcherItem-button"><div class="Box-root Box-background--white Padding-horizontal--8 Padding-vertical--4 Flex-flex Flex-alignItems--center" style="cursor: pointer; user-select: none;"><div class="Box-root Margin-right--8"><div class="Card-root Card--radius--circle Avatar Avatar--size--28 db-AccountSwitcher-image Box-root Box-background--white"><div class="Avatar-inner Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"><img src="https://files.stripe.com/files/MDB8YWNjdF8xS1NibXRHM0xjSkJDR2JYfGZfbGl2ZV9nRkhYQ1NGeGZkYVFrcEU3dE9lMUVtSVc00yYVxNz76" alt=""></div></div></div><div class="TruncatedText" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="Text-color--default Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--inline">foundys</span></div></div></button></div></li><li aria-selected="false" id="accountSwitcher-item-3" role="option"><div><button class="db-AccountSwitcherItem-button"><div class="Box-root Box-background--white Padding-horizontal--8 Padding-vertical--4 Flex-flex Flex-alignItems--center" style="cursor: pointer; user-select: none;"><div class="Box-root Margin-right--8"><div class="Card-root Card--radius--circle Avatar Avatar--size--28 db-AccountSwitcher-image Box-root Box-background--white"><div class="Avatar-inner Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"><img src="https://files.stripe.com/files/MDB8YWNjdF8xS1NnMEtKZnNMNzVRSE51fGZfbGl2ZV9UWEEyVUNlRFJoQkQ3SUQ2TDdOSTBuVWQ0030dzhAzz" alt=""></div></div></div><div class="TruncatedText" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="Text-color--default Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--inline">foundys.02</span></div></div></button></div></li><li aria-selected="false" id="accountSwitcher-item-4" role="option"><div><button class="db-AccountSwitcherItem-button"><div class="Box-root Box-background--white Padding-horizontal--8 Padding-vertical--4 Flex-flex Flex-alignItems--center" style="cursor: pointer; user-select: none;"><div class="Box-root Margin-right--8"><div class="Card-root Card--radius--circle Avatar Avatar--size--28 db-AccountSwitcher-image Box-root Box-background--white"><div class="Avatar-inner Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"><img src="https://files.stripe.com/files/MDB8YWNjdF8xS1NnNjNIV3UxT0d3VHY5fGZfbGl2ZV9zMHkzWjBGcTAySHpLZWdhRzJUMEYyOEg008rbNPtQK" alt=""></div></div></div><div class="TruncatedText" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><span class="Text-color--default Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--inline">foundys.03</span></div></div></button></div></li><li aria-selected="true" id="accountSwitcher-item-5" role="option"><div><button class="db-AccountSwitcherItem-button"><div class="Box-root Box-background--blue Padding-horizontal--8 Padding-vertical--4 Flex-flex Flex-alignItems--center" style="cursor: pointer; user-select: none;"><div class="Box-root Margin-right--8"><div class="Card-root Card--radius--circle Avatar Avatar--size--28 Box-root Box-background--white"><div class="Avatar-inner Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"><div aria-hidden="true" class="SVGInline SVGInline--cleaned SVG Icon Icon--add Icon-color Icon-color--gray600 Box-root Flex-flex"><svg aria-hidden="true" class="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--add-svg Icon-color-svg Icon-color--gray600-svg" height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z" fill-rule="evenodd"></path></svg></div></div></div></div><div class="TruncatedText" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgb(255, 255, 255);"><span class="Text-color--white Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--inline">New account</span></div></div></button></div></li></ul></div></div></div></span></div></div>