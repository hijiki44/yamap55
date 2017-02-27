#!/usr/bin/env groovy
def s = this.class.protectionDomain.codeSource.location.path
def p = (s=~/^(.*)\//)[0][0]

//def p = "/Users/yamap_55/github/yamap55/"

def removeLists = [
  "# What I did / やったこと",
  "# What I want to do / やりたいこと",
  "# What I thought / 思ったこと",
  /\(http.*\)/,
  "\n",
  "- "
]
def removeText = {
  def text = it.text
  removeLists.each{text = text.replaceAll(it,"")}
  text
}

def map = [:].withDefault{[count : 0, size : 0]}
def func = {}
func = {
  it.eachFile {
    def name = it.name
    if (name == ".git") {
      return
    }
    if (it.isDirectory()) {
      return func(it)
    } else {
      def m = it.name =~ /^(\d{6})\d{2}/
      if (m) {
        map[m[0][1]].count++
        map[m[0][1]].size += removeText(it).size()
      }
    }
  }
}

func(new File(p))
println "ディレクトリ, 平均文字数"
map.each {
  println "${it.key}, ${((it.value.size / it.value.count) as int)}"
}
