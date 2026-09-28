import type { Resource } from '../../types/resource';
import { resources3dToColor } from './categories3dToColor';
import { resourcesEducationToWeb } from './categoriesEducationToWeb';

export const resources: Resource[] = [...resources3dToColor, ...resourcesEducationToWeb];