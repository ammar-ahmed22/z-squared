import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NavigationOption } from "../components/Page/Navigation";
import Page from "../components/Page";


type CustomRouteObject = RouteObject & {
  navigationOption?: NavigationOption,
}

type CreateBrowserRouterOpts = Parameters<typeof createBrowserRouter>[1]

export const createCustomBrowserRouter = (routes: CustomRouteObject[], opts?: CreateBrowserRouterOpts) => {
  const customRoutes : RouteObject[] = routes.map( route => {
    const { element, ...rest } = route;
    return {
      ...rest,
      element: (
        <Page navigationOption={route.navigationOption} >
          { element }
        </Page>
      )
    }
  })
  return createBrowserRouter(customRoutes, opts);
}