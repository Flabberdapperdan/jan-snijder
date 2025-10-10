import { Injectable } from '@angular/core'
import { Home } from '../home.types'
import { client } from '../../../../sanity/client'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private HOME_CONTENT = `
   *[_type == "home"]{
      _id,
      title,
      subtitle,
      }
  `

  async getContent(): Promise<Home[]> {
    return await client.fetch<Home[]>(this.HOME_CONTENT, {}, {}) // Do we need options here?
  }
}
