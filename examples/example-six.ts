type Customer = {
  customerId: number;
  firstName: string;
  lastName: string;
};

type Product = {
  productId: number;
  title: string;
  price: number;
};

type Order = {
  orderId: number;
  customer: Customer;
  products: Product[];
  date: Date;
};

type Medium = {
  id: number;
  title: string;
  artist: string;
};

type TrackInfo = {
  duration: number;
  tracks: number;
};

type CD = Medium &
  TrackInfo & {
    kind: "cd";
  };

type LP = Medium & { sides: { a: TrackInfo; b: TrackInfo }; kind: "lp" };

type AllMedia = CD | LP;

type MediaKinds = AllMedia["kind"];

type FetchParams = number | Customer | Product;

type FetchReturn<Param extends FetchParams> = Param extends Customer
  ? Order[]
  : Param extends Product
  ? Order[]
  : Order;

type Callback<Res> = (result: Res) => void;

function fetchOrder<Param extends FetchParams>(
  inp: Param
): Promise<FetchReturn<Param>>;
function fetchOrder<Param extends FetchParams>(
  inp: Param,
  fun: Callback<FetchReturn<Param>>
): void;
function fetchOrder<Par extends FetchParams>(
  inp: Par,
  fun?: Callback<FetchReturn<Par>>
): Promise<FetchReturn<Par>> | void {
  const res = fetch(`/backend?inp=${JSON.stringify(inp)}`).then((res) =>
    res.json()
  );

  if (fun) {
    res.then((result) => {
      fun(result);
    });
  } else {
    return res;
  }
}

type SelectBranch<Brnch, Kin> = Brnch extends { kind: Kin } ? Brnch : never;
