import { TestBed } from '@angular/core/testing';

import { MusicDetailResolverResolver } from './music-detail-resolver.resolver';

describe('MusicDetailResolverResolver', () => {
  let resolver: MusicDetailResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MusicDetailResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
