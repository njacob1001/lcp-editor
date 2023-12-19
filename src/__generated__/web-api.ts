import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const MinimumDatamodel = z
  .object({ finderId: z.string(), id: z.string(), name: z.string() })
  .partial()
  .passthrough();
const EmptySuccessResponse = z
  .object({ success: z.boolean().default(true) })
  .partial()
  .passthrough();
const ErrorResponse = z
  .object({ message: z.string(), success: z.boolean() })
  .partial()
  .passthrough();
const Attribute = z
  .object({ dataType: z.string(), id: z.string(), name: z.string() })
  .partial()
  .passthrough();
const Datamodel = z
  .object({
    attributes: z.array(Attribute),
    finderId: z.string(),
    id: z.string(),
    name: z.string(),
  })
  .partial()
  .passthrough();
const UpdateRequest = z
  .object({ attributes: z.array(Attribute) })
  .partial()
  .passthrough();
const CreateFinderElementInput = z
  .object({
    currentFinderId: z.string(),
    isFolder: z.boolean(),
    moduleType: z.string(),
    name: z.string(),
  })
  .partial()
  .passthrough();
const Finder = z
  .object({
    createdAt: z.string(),
    directory: z.string(),
    elementId: z.string(),
    elementType: z.string(),
    id: z.string(),
    name: z.string(),
    updatedAt: z.string(),
  })
  .partial()
  .passthrough();
const FinderInfo = z
  .object({ finder: Finder, previous: Finder })
  .partial()
  .passthrough();
const MoveRequest = z
  .object({ finder_id: z.string(), target_finder_id: z.string() })
  .partial()
  .passthrough();
const RenameRequest = z
  .object({ finderId: z.string(), newName: z.string() })
  .partial()
  .passthrough();
const dto_UiLink = z
  .object({ label: z.string(), url: z.string() })
  .partial()
  .passthrough();
const UiContent = z
  .object({ elements: z.array(Finder), name: z.string(), previous: dto_UiLink })
  .partial()
  .passthrough();

export const schemas = {
  MinimumDatamodel,
  EmptySuccessResponse,
  ErrorResponse,
  Attribute,
  Datamodel,
  UpdateRequest,
  CreateFinderElementInput,
  Finder,
  FinderInfo,
  MoveRequest,
  RenameRequest,
  dto_UiLink,
  UiContent,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/datamodel",
    alias: "postDatamodel",
    description: `Create a new empty datamodel`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `create data`,
        type: "Body",
        schema: MinimumDatamodel,
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "delete",
    path: "/datamodel/:id",
    alias: "deleteDatamodelId",
    description: `a datamodel deletion consists of: move the datamodel to the trash.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/datamodel/:id",
    alias: "getDatamodelId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Datamodel,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "put",
    path: "/datamodel/:id",
    alias: "putDatamodelId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `update data`,
        type: "Body",
        schema: UpdateRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/datamodel/build/:id",
    alias: "postDatamodelbuildId",
    description: `Apply the datamodel changes to the database`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/finder",
    alias: "postFinder",
    description: `Create a finder element and a empty element of the specifict type, i.e datamodel, form, workflow
One created both elements are linked by a reference id`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `create data`,
        type: "Body",
        schema: CreateFinderElementInput,
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "delete",
    path: "/finder/:finderId",
    alias: "deleteFinderFinderId",
    description: `When delete a finder element, the element linked to it is also deleted
If the element is a folder, all the elements inside are deleted as well`,
    requestFormat: "json",
    parameters: [
      {
        name: "finderId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/finder/:moduleType",
    alias: "getFinderModuleType",
    description: `List of elements inside a specifict directory, if no directory path is provided then it will return the elements in the root level only`,
    requestFormat: "json",
    parameters: [
      {
        name: "moduleType",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "finderId",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: UiContent,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/finder/findById/:finderId",
    alias: "getFinderfindByIdFinderId",
    description: `Find a finder by id`,
    requestFormat: "json",
    parameters: [
      {
        name: "finderId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: FinderInfo,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/finder/move",
    alias: "postFindermove",
    description: `This action will move the finder element and the children to the new parent`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `move data`,
        type: "Body",
        schema: MoveRequest,
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "put",
    path: "/finder/rename",
    alias: "putFinderrename",
    description: `The name is updated in the finder and in the element of the specifict type, i.e datamodel, form, workflow`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `rename element`,
        type: "Body",
        schema: RenameRequest,
      },
    ],
    response: z
      .object({ success: z.boolean().default(true) })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Internal Server Error`,
        schema: ErrorResponse,
      },
    ],
  },
]);

export const api = new Zodios("http://localhost:4000", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
