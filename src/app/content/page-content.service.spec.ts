import { afterEach, describe, expect, it, vi } from 'vitest';
import { client } from '../../../sanity/client';
import { PageContentService } from './page-content.service';

describe('PageContentService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and shares all non-painting content in one request', async () => {
    const rawContent = {
      home: { _id: 'home', title: 'Home', subtitle: 'Welcome', image: null },
      newsItems: [],
      exhibits: [],
      video: null,
    };
    const fetchSpy = vi
      .spyOn(client, 'fetch')
      .mockResolvedValue(rawContent as never);
    const service = new PageContentService();

    const firstRequest = service.getPageContent();
    const secondRequest = service.getPageContent();

    expect(secondRequest).toBe(firstRequest);
    await expect(firstRequest).resolves.toEqual({
      ...rawContent,
      home: { ...rawContent.home, image: '' },
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.mock.calls[0][0]).toContain('"newsItems"');
    expect(fetchSpy.mock.calls[0][0]).toContain('"exhibits"');
    expect(fetchSpy.mock.calls[0][0]).toContain('"video"');
    expect(fetchSpy.mock.calls[0][0]).not.toContain('"paintings"');
  });
});
