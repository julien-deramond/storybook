import global from 'global';
import configure from '../configure';
import hasDependency from '../hasDependency';
import type { Loader } from '../Loader';
import type { StoryshotsOptions } from '../../api/StoryshotsOptions';

function test(options: StoryshotsOptions): boolean {
  return options.framework === 'rax' || (!options.framework && hasDependency('@storybook/rax'));
}

function load(options: StoryshotsOptions) {
  global.STORYBOOK_ENV = 'rax';

  const storybook = jest.requireActual('@storybook/html');
  const clientAPI = jest.requireActual('@storybook/client-api');

  configure({
    ...options,
    storybook: {
      ...clientAPI,
      ...storybook,
    },
  });

  return {
    framework: 'rax' as const,
    renderTree: jest.requireActual('./renderTree').default,
    renderShallowTree: () => {
      throw new Error('Shallow renderer is not supported for rax');
    },
    storybook,
  };
}

const raxLoader: Loader = {
  load,
  test,
};

export default raxLoader;
