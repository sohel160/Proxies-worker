export default {
  async fetch(request) {

    const url = new URL(request.url)

    if (url.searchParams.get("token") !== "abc123") {
      return new Response("Forbidden", { status: 403 })
    }

    const ua = request.headers.get("User-Agent") || ""

    const allowedUA = [
      "Clash",
      "clash",
      "ClashMeta",
      "ClashforWindows",
      "ClashX",
      "Stash",
      "FiClash"
    ]

    let allowed = false

    for (const a of allowedUA) {
      if (ua.includes(a)) {
        allowed = true
        break
      }
    }

    if (!allowed) {
      return new Response("404 Not Found", { status: 404 })
    }

    const proxies = `
proxies:

 - name: "socks1"
    type: socks5
    server: 103.73.39.158
    port: 9168
    username: uc97af4ffb4f6
    password: UtgaLARZDrjpv_Ox

  - name: "socks2"
    type: socks5
    server: 103.186.238.117
    port: 9167
    username: u7dc1a4dc5707
    password: FWzt41-zVKWztkeH

  - name: "socks3"
    type: socks5
    server: 103.186.238.116
    port: 9167
    username: u67062e5ec24f
    password: GguPb5w4cC_WYDer

  - name: "socks4"
    type: socks5
    server: 103.120.221.37
    port: 9168
    username: u715b6d5089e7
    password: Rus-Lj_aNgw43Vbn

  - name: "socks5"
    type: socks5
    server: 103.179.155.84
    port: 9168
    username: u0a6309cf4e11
    password: -nYl6DiOoBBJ3g3O

  - name: "socks6"
    type: socks5
    server: 103.175.242.0
    port: 1080
    username: ud78992dc3232
    password: q8qeMjqeqQzUWjo7

`

    return new Response(proxies, {
      headers: {
        "Content-Type": "text/plain"
      }
    })

  }
}
