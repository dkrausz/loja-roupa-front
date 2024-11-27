import {Banner} from "../../components/banner";

import {CardList} from "../../components/cardList";
import {TemplatePage} from "../Template";

export function HomePage(): JSX.Element {
  return (
    <>
      <TemplatePage>
        <main>
          <Banner />
          <CardList />
        </main>
      </TemplatePage>
    </>
  );
}
