import { Injectable } from '@angular/core';
import { Exhibit } from '../exhibits.types';
import { client } from '../../../../sanity/client';

@Injectable({
  providedIn: 'root'
})
export class ExhibitsService {
  private Exhibits_Query = `
    *[_type == "exhibit"]{
      _id,
      name,
      year,
      location,
      description
    }
  `;

  async getExhibits(): Promise<Exhibit[]> {
    return await client.fetch<Exhibit[]>(this.Exhibits_Query, {}, {});
  }
}


