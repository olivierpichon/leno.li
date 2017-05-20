export default function fetchComponentData(dispatch, components, params, authorization) {
  const needs = components.reduce( (prev, current) => {

    return current ? (current.needs || []).concat(prev) : prev;
  }, []);

  const promises = needs.map(need => dispatch(need(params, authorization)));

  return Promise.all(promises);
}
