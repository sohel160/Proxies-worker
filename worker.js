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

  - name: speed1
    type: socks5
    server: 180.92.235.222
    port: 16626
    username: ub3977bb7d309
    password: 1-2LYkl4rMC3D1xy

  - name: speed2
    type: socks5
    server: 180.92.229.54
    port: 16626
    username: uf7c149982eeb
    password: 3j8M5GOJBxbFphzj

  - name: speed3
    type: socks5
    server: 103.79.178.206
    port: 9168
    username: ua20c6877f504
    password: lnrkpbqS80fLBwlK

  - name: speed4
    type: socks5
    server: 103.239.252.42
    port: 1088
    username: u24e3a422c037
    password: HKEFMKYOPm1bn3ph

  - name: speed5
    type: socks5
    server: 182.252.77.160
    port: 9168
    username: u541179755e11
    password: bjxGnakmxN-jTxGg

  - name: speed6
    type: socks5
    server: 103.48.161.248
    port: 1080
    username: u57787b7a23b0
    password: IqXi9LCfTfX1Z8hV
`

    return new Response(proxies, {
      headers: {
        "Content-Type": "text/plain"
      }
    })

  }
}
