export interface FetchOpenSeaAssetsParams {
  address: string;
  cursor?: string;
}

/**
 * Annotated asset spec with OpenSea metadata
 */
export interface OpenSeaAsset {
  token_id: string;
  asset_contract: {
    name: string;
    address: string;
  };
  name: string;
  description: string;
  owner: {
    address: string;
    config: string;
    profile_img_url: string;
  };
  image_url: string;
  image_preview_url: string;
  image_url_original: string;
  image_url_thumbnail: string;
  opensea_link: string;
  external_link: string;
  traits: object[];
  background_color: string | null;
}

const OPENSEA_API_BASE_URL = 'https://api.opensea.io/api/v1';

export function fetchAssets({ address, cursor }: FetchOpenSeaAssetsParams) {
  const params = new URLSearchParams({
    limit: '20',
    owner: address,
  });

  if (cursor) {
    params.append('cursor', cursor);
  }

  return fetch(`${OPENSEA_API_BASE_URL}/assets?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(
    (response) =>
      response.json() as Promise<{
        assets: OpenSeaAsset[];
        next: string | null;
        previous: string | null;
      }>
  );
}
