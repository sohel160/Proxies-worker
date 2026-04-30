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

- name: proxy1
  type: http
  server: 144.48.108.12
  port: 5452
- name: proxy2
  type: http
  server: 103.69.150.11
  port: 9855
- name: proxy3
  type: http
  server: 103.109.96.2
  port: 9862
- name: proxy4
  type: http
  server: 103.69.150.13
  port: 9859
- name: proxy5
  type: http
  server: 27.147.195.16
  port: 27271
- name: proxy6
  type: http
  server: 103.198.132.9
  port: 2610
  
`

    return new Response(proxies, {
      headers: {
        "Content-Type": "text/plain"
      }
    })

  }
}
