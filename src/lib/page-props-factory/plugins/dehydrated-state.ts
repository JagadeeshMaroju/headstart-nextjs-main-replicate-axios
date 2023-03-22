import { DehydratedState } from '@tanstack/react-query';
import { DehydratedStateProps } from 'lib/component-props';
import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import merge from 'ts-deepmerge';
import { Plugin } from '..';

/*
  Allow component GetServerSideProps|GetStaticProps to fetch and dehydrate data.
  Aggregate here to page props level to send to <Hydrate /> (** see _app.tsx)
  This passes server side data to client side cache, saving redundant client-side queries.
*/
class DehydratedStatePlugin implements Plugin {
  order = 2; // run after component-props plugin

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    let data: DehydratedState;
    if (props.componentProps) {
      for (const p in props.componentProps) {
        const thisProps = props.componentProps[p] as DehydratedStateProps;
        if (!!thisProps?.props?.dehydratedState) {
          data = merge(data || {}, thisProps.props?.dehydratedState);
        }
      }
    }

    if (!!data) {
      props.dehydratedState = data;
    }
    return props;
  }
}

export const dehydratedStatePlugin = new DehydratedStatePlugin();
