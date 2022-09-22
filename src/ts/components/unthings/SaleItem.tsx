/*
 * sale item
 */

import * as React from 'react';

import { ExternalIcon } from 'components/utils/ExternalIcon';
import { Piccy } from 'components/utils/Piccy';

const buylink = 'https://docs.google.com/forms/d/e/1FAIpQLScbeHIELZQR48vi9n-31YRRdMMG6VKsIGJScKeY-vTODGcF9g/viewform?usp=pp_url&entry.494060528=';

export type ItemDesc = {
  title: string;
  tags: string[];
  sold: boolean;

  size: string | null;
  price: number;
  msrp: number;
  obo: boolean;

  pics: Piccy.Desc[];
  link: string | null;
  bg: string | null;
  innerHTML: string;
};

export const SaleItem: React.FC<ItemDesc> = (props) => {
  const title = () => {
    if (!props.link) return <>{props.title}</>;
    return (
      <a href={props.link} target="_blank">
        <span>{props.title}</span>
        <ExternalIcon />
      </a>
    );
  };

  const size = () => (
    <span className="unthings-item-size">
      {props.size}
    </span>
  );

  const msrp = () => (
    <>
      <hr className="unthings-item-pricediv"></hr>
      <span className="unthings-item-msrp">
        {props.msrp.toFixed(2)}
      </span>
      <span className="unthings-item-discount">
        {discount}
      </span>
    </>
  );

  const buy = () => (
    <button
      className="unthings-item-buy"
      onClick={() => window.open(
        buylink + encodeURIComponent(`${props.title} ($${props.price})`),
        '_blank', 'noopener,noreferrer'
      )}
    >
    </button>
  );

  const sold = () => (
    <span className="unthings-item-sold">
    </span>
  );

  const discount = Math.round((props.price / props.msrp) * 100);

  const cn = props.sold
    ? "unthings-item unthings-sold"
    : "unthings-item";

  return (
    <div className={cn}>
      <Piccy
        key={props.title}
        style={props.bg ? { background: props.bg } : undefined}
        pics={props.pics}
        classPrefix="unthings"
        localImg={(x) => x}
        localSrcs={(_) => []}
      />
      <div className="unthings-item-text">
        <header className="unthings-item-header">
          <h2 className="unthings-item-title">
            {title()}
          </h2>
          <div className="unthings-item-metadata">
            {props.size ? size() : null}
            <span className="unthings-item-price">
              {props.obo ? `${props.price} OBO` : props.price}
            </span>
            {props.msrp !== 0 ? msrp() : null}
            {props.sold ? sold() : buy()}
          </div>
        </header>
        <div
          className="unthings-item-content"
          dangerouslySetInnerHTML={{__html: props.innerHTML}}>
        </div>
      </div>
    </div>
  );
}
